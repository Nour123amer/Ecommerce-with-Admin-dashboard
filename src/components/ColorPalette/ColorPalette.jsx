import { forwardRef } from "react";

const colorOptions = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#6b7280" ,"#ea4444", "#f50d0b", "#fcb981", "#9a82f6" 
    ,"#8b5cf6" ,"#9a82f6" ,"#6b7280" ,"#ffffff" ,"#000000"
];

const Circle = forwardRef(({ color = "#000", onChange, pointProps }, ref) => {
  return (
    <div ref={ref} {...pointProps} className="flex gap-3 flex-wrap mt-4 w-1/2">
      {colorOptions.map((clr) => (
        <div
          key={clr}
          onClick={() => onChange({ hex: clr })} // pass the selected color
          style={{
            backgroundColor: clr,
            width: 32,
            height: 32,
            borderRadius: "50%",
            cursor: "pointer",
            border: clr === color ? "2px solid black" : "1px solid #ccc",
          }}
        />
      ))}
    </div>
  );
});

export default Circle;
