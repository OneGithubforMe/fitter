import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import restImage from "../assets/rest.jpg"
import startSound from "../assets/start.mp3"
import restSound from "../assets/rest.mp3"

function WorkoutRunner() {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [phase, setPhase] = useState("rest") // "rest" | "exercise"
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [repIndex, setRepIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [exerciseImageError, setExerciseImageError] = useState(false)

  if (!state?.workout) {
    navigate("/", { replace: true })
    return null
  }

  const { workout, restTime, exerciseConfigs } = state
  const exercises = workout.exercises
  const totalExercises = exercises.length

  const currentExercise = exercises[exerciseIndex]
  const currentConfig = exerciseConfigs[exerciseIndex]
  const totalReps = currentConfig?.reps ?? 10
  const exerciseDuration = currentConfig?.time ?? 60

  const isLastRep = repIndex === totalReps - 1
  const isLastExercise = exerciseIndex === totalExercises - 1
  const isComplete = isLastRep && isLastExercise

  const totalPhaseTime = phase === "rest" ? restTime : exerciseDuration
  const progressPercent = totalPhaseTime > 0 ? (timeLeft / totalPhaseTime) * 100 : 0

  useEffect(() => {
    if (phase === "rest") {
      setTimeLeft(restTime)
      const audio = new Audio(restSound)
      audio.volume = 0.7
      audio.play().catch(() => {})
    } else {
      setTimeLeft(exerciseDuration)
      const audio = new Audio(startSound)
      audio.volume = 0.7
      audio.play().catch(() => {})
    }
  }, [phase, exerciseIndex, restTime, exerciseDuration])

  useEffect(() => {
    setExerciseImageError(false)
  }, [exerciseIndex, phase])

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (phase === "rest") {
            setPhase("exercise")
          } else {
            if (isComplete) {
              navigate(`/setup/${id}`, { replace: true })
              return 0
            }
            if (isLastRep) {
              setExerciseIndex((i) => i + 1)
              setRepIndex(0)
            } else {
              setRepIndex((r) => r + 1)
            }
            setPhase("rest")
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, phase, exerciseIndex, repIndex, isLastRep, isLastExercise, isComplete, id, navigate])

  const containerStyle = {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

  const timerStyle = {
    fontSize: "5rem",
    fontWeight: 700,
    margin: "2rem 0",
    fontVariantNumeric: "tabular-nums",
  }

  const phaseLabelStyle = {
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    opacity: 0.7,
    marginBottom: "0.5rem",
  }

  const cardStyle = {
    padding: "1.5rem",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    width: "100%",
    marginTop: "1rem",
    textAlign: "left",
  }

  const progressBarStyle = {
    width: "100%",
    height: "8px",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "1rem",
  }

  const progressFillStyle = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: phase === "rest" ? "#4a9eff" : "#646cff",
    borderRadius: "4px",
    transition: "width 1s linear",
  }

  const imageStyle = {
    width: "100%",
    maxWidth: "280px",
    aspectRatio: "1",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "1rem",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  }

  const imageContainerStyle = {
    width: "100%",
    maxWidth: "280px",
    aspectRatio: "1",
    marginBottom: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const showExerciseImage =
    phase === "exercise" &&
    currentExercise?.image &&
    !exerciseImageError

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={phaseLabelStyle}>
          {phase === "rest" ? "Rest" : "Exercise"}
        </div>

        {phase === "rest" ? (
          <img
            src={restImage}
            alt="Rest"
            style={imageStyle}
          />
        ) : (
          <div style={imageContainerStyle}>
            {showExerciseImage ? (
              <img
                key={`${exerciseIndex}-${repIndex}`}
                src={currentExercise.image}
                alt={currentExercise.exercise}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="eager"
                referrerPolicy="no-referrer"
                onError={() => setExerciseImageError(true)}
              />
            ) : (
              <span style={{ opacity: 0.5, fontSize: "0.9rem" }}>
                {currentExercise?.exercise}
              </span>
            )}
          </div>
        )}

        <div style={timerStyle}>{timeLeft}</div>

        <div style={progressBarStyle}>
          <div style={progressFillStyle} />
        </div>

        {phase === "rest" ? (
          <>
            <p style={{ opacity: 0.8, marginBottom: "0.5rem", marginTop: "1.5rem" }}>
              Next up
            </p>
            <div style={cardStyle}>
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem" }}>
                {currentExercise?.exercise}
              </h2>
              <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
                {currentExercise?.instructions}
              </p>
              <p style={{ marginTop: "0.75rem", opacity: 0.7, fontSize: "0.9rem" }}>
                Rep {repIndex + 1} of {totalReps}
                {totalExercises > 1 && (
                  <> · Exercise {exerciseIndex + 1} of {totalExercises}</>
                )}
              </p>
            </div>
          </>
        ) : (
          <>
            <p style={{ opacity: 0.8, marginBottom: "0.5rem", marginTop: "1.5rem" }}>
              Rep {repIndex + 1} of {totalReps}
            </p>
            <div style={cardStyle}>
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem" }}>
                {currentExercise?.exercise}
              </h2>
              <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
                {currentExercise?.instructions}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WorkoutRunner
