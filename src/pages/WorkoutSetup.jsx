import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import workoutsData from "../assets/workouts.json"

function WorkoutSetup() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts } = workoutsData
  const workout = workouts[parseInt(id, 10)]

  const [restTime, setRestTime] = useState(30)
  const [exerciseTime, setExerciseTime] = useState(60)
  const [reps, setReps] = useState(10)

  const handleStartWorkout = () => {
    const exerciseConfigs = workout.exercises.map(() => ({
      time: exerciseTime,
      reps,
    }))
    navigate(`/run/${id}`, {
      state: {
        workout,
        restTime,
        exerciseConfigs,
      },
    })
  }

  if (!workout) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Workout not found.</p>
        <Link to="/">Back to workouts</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "1.5rem",
          color: "#646cff",
          textDecoration: "none",
        }}
      >
        ← Back to workouts
      </Link>
      <h1 style={{ marginBottom: "1.5rem" }}>{workout.name}</h1>
      <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
        {workout.exercises.length} exercises
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {workout.exercises.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: "1.5rem",
              padding: "1.25rem",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>
              {index + 1}. {item.exercise}
            </h3>
            <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
              {item.instructions}
            </p>
            {item.image && (
              <img
                src={item.image}
                alt={item.exercise}
                style={{
                  marginTop: "1rem",
                  maxWidth: "100%",
                  borderRadius: "6px",
                  display: "block",
                }}
              />
            )}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.25rem",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Rest time (seconds)
          </label>
          <input
            type="number"
            min={0}
            value={restTime}
            onChange={(e) => setRestTime(parseInt(e.target.value, 10) || 0)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "inherit",
              fontSize: "1rem",
              width: "100px",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Exercise time (seconds)
          </label>
          <input
            type="number"
            min={0}
            value={exerciseTime}
            onChange={(e) =>
              setExerciseTime(parseInt(e.target.value, 10) || 0)
            }
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "inherit",
              fontSize: "1rem",
              width: "100px",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Reps
          </label>
          <input
            type="number"
            min={0}
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value, 10) || 0)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "inherit",
              fontSize: "1rem",
              width: "100px",
            }}
          />
        </div>
        <button
          onClick={handleStartWorkout}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#646cff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Start Workout
        </button>
      </div>
    </div>
  )
}

export default WorkoutSetup
