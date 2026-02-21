import { Link } from "react-router-dom"
import workoutsData from "../assets/workouts.json"

const workouts = Array.isArray(workoutsData) ? workoutsData : workoutsData.workouts

function WorkoutList() {

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Workouts</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {workouts.map((workout, index) => (
          <li key={index} style={{ marginBottom: "0.75rem" }}>
            <Link
              to={`/setup/${index}`}
              style={{
                display: "block",
                padding: "1rem 1.25rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                color: "inherit",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "background-color 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
                e.currentTarget.style.borderColor = "#646cff"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
              }}
            >
              <strong>{workout.name}</strong>
              <span style={{ opacity: 0.7, marginLeft: "0.5rem" }}>
                ({workout.exercises.length} exercises)
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutList
