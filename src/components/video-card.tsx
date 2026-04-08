import Image from "next/image";

type VideoCardProps = {
  id: number;
  title: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  likes: number;
  performer: string;
  performerAvatar: string;
  isHD: boolean;
  category: string;
  tags: string;
};

export default function VideoCard({
  title,
  thumbnailUrl,
  duration,
  views,
  likes,
  performer,
  performerAvatar,
  isHD,
  category,
  tags,
}: VideoCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
        />
        <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
          {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
        </span>
        {isHD && (
          <span className="absolute left-2 top-2 rounded bg-rose-600 px-2 py-0.5 text-xs font-bold">
            HD
          </span>
        )}
      </div>

      <div className="space-y-2 p-3">
        <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
        <div className="flex items-center gap-2">
          <Image
            src={performerAvatar}
            alt={performer}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <p className="text-xs text-zinc-400">{performer}</p>
        </div>
        <p className="text-xs text-zinc-500">{category}</p>
        <p className="line-clamp-1 text-xs text-zinc-500">{tags}</p>
        <p className="text-xs text-zinc-400">{views.toLocaleString()} views ? {likes.toLocaleString()} likes</p>
      </div>
    </article>
  );
}
