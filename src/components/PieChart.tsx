import React, { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface PieChartProps {
  completed: number
  notCompleted: number
}

export default function PieChart(props: PieChartProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  const { completed, notCompleted } = props

  useEffect(() => {
    let chart: Chart | null = null
    if (ref.current) {
      chart = new Chart(ref.current, {
        type: "pie",
        options: {
          responsive: true,
        },
        data: {
          labels: ["completati", "non completati"],
          datasets: [
            {
              data: [completed, notCompleted],
              hoverOffset: 20,
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
            },
          ],
        },
      })
    }
    console.log(ref.current)

    return () => {
      chart?.destroy()
    }
  }, [completed, notCompleted])

  return <canvas id="pippo" ref={ref} width="300" height="300" />
}
