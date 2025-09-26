export default function CardDetails({
  title,
  date,
  paraf,
}: {
  title: string;
  date: string;
  paraf: string;
}) {
  return (
    <div className="bg-surface text-text font-body flex flex-col items-center rounded-2xl p-4 transition-transform hover:scale-105 w-48">
      <div className="flex gap-4 items-center">
        <h1 className=" font-title">{title}</h1>
      </div>
      <h2 className=" text-text-muted break-words text-center pt-2">{date}</h2>
      <p>{paraf}</p>
    </div>
  );
}
