import React, { Fragment, useMemo } from "react";
import "./BarChart.css";

export const BarChart = ({ chartData, categoryFilter }) => {
  const SVG_HEIGHT = 150;
  const SVG_WIDTH = 600;
  const PADDING = 2;

  const BAR_WIDTH = 40;
  const GROUP_WIDTH = 100;

  const totalContentWidth = chartData.length * GROUP_WIDTH;
  const offset = (SVG_WIDTH - totalContentWidth) / 2;

  const { maxVal, scale } = useMemo(() => {
    const max = Math.max(
      ...chartData.map((i) => Math.max(i.itIndustry, i.serviceIndustry)),
    );
    const s = max > 0 ? (SVG_HEIGHT - 2 * PADDING) / max : 0;
    return { maxVal: max, scale: s };
  }, [chartData]);

  return (
    <svg
      className="bar-chart-container"
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {chartData.map((item, index) => {
        console.log(index);
        const xPosition = index * GROUP_WIDTH + offset;

        const itHeight = item.itIndustry * scale;
        const serviceHeight = item.serviceIndustry * scale;

        return (
          <Fragment key={item.id}>
            {(categoryFilter === "all" || categoryFilter === "it") && (
              <rect
                key={`it-${item.id}`}
                width={BAR_WIDTH}
                height={itHeight}
                x={xPosition}
                y={SVG_HEIGHT - PADDING - itHeight}
                fill="var(--it-color)"
                className="bar-rect"
                rx={4}
                ry={4}
              >
                <title>IT Industry: {item.itIndustry}</title>
              </rect>
            )}
            {(categoryFilter === "all" || categoryFilter === "service") && (
              <rect
                key={`service-${item.id}`}
                width={BAR_WIDTH}
                height={serviceHeight}
                x={xPosition + BAR_WIDTH + 5}
                y={SVG_HEIGHT - PADDING - serviceHeight}
                fill="var(--service-color)"
                className="bar-rect"
                rx={4}
                ry={4}
              >
                <title>Service Industry: {item.serviceIndustry}</title>
              </rect>
            )}
          </Fragment>
        );
      })}
    </svg>
  );
};
