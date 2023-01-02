import Image from "next/image";

const Author: React.FC<{
  author: { id: string; name: string; bio: string; photo: { url: string } };
}> = ({ author }) => {
  return (
    <div className="relative text-center mt-20 mb-8 p-12 bg-black bg-opacity-40 text-white rounded-lg">
      <div className="absolute -top-10 left-0 right-0">
        <Image
          src={author.photo.url}
          unoptimized
          alt={author.name}
          height="70px"
          width="70px"
          className="align-middle rounded-full"
        />
      </div>
      <h1 className="font-semibold">{author.name}</h1>
      <p>{author.bio}</p>
    </div>
  );
};

export default Author;
