export default function CardInf({
  text,
  count,
  color,
}: {
  text: string;
  count?: number;
  color: string;
}) {
  return (
    <div className="bg-surface text-text font-body flex flex-col items-center rounded-2xl p-4 transition-transform hover:scale-105 w-48">
      <div className="flex gap-4 items-center">
        <div className={`p-4 rounded-full bg-${color}`}></div>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
      <p className=" text-text-muted break-words text-center pt-2">{text}</p>
    </div>
  );
}
