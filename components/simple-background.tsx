"use client"

export default function SimpleBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute top-[60%] left-[60%] h-[250px] w-[250px] rounded-full bg-secondary/10 blur-[100px]" />
      <div className="absolute top-[40%] left-[40%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute top-[10%] left-[70%] h-[200px] w-[200px] rounded-full bg-secondary/10 blur-[100px]" />
      <div className="absolute top-[80%] left-[20%] h-[350px] w-[350px] rounded-full bg-primary/10 blur-[100px]" />
    </div>
  )
}
