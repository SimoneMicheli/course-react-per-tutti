import React, { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface PieChartProps {
  completed: number
  notCompleted: number
}

export default function PieChart(props: PieChartProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  const { completed, notCompleted } = props
  const chart = useRef<Chart | null>(null)

  useEffect(() => {
    if (ref.current) {
      chart.current = new Chart(ref.current, {
        type: "pie",
        options: {
          responsive: true,
        },
        data: {
          labels: ["completati", "non completati"],
          datasets: [
            {
              data: [0, 0],
              hoverOffset: 20,
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
            },
          ],
        },
      })
    }

    return () => {
      chart.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (chart.current) {
      chart.current.data.datasets[0].data = [completed, notCompleted]
      chart.current.update()
    }
  }, [completed, notCompleted])

  return <canvas ref={ref} width="300" height="300" />
}
