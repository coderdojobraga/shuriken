export default function Speaker({ picture, name, role }) {
  return (
    <div className="w-12/12 xl:w-2/10 mx-auto mb-12 mt-12 px-4 sm:w-6/12 md:w-4/12 lg:mb-0 lg:w-4/12 2xl:w-4/12">
      <img
        alt={name}
        src={`img/team/${picture}`}
        className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg md:h-48 md:w-48"
      />
      <div className="p-4 text-center">
        <p className="text-3xl font-bold md:text-2xl lg:text-xl">{name}</p>
        <p className="md:text-md mt-1 text-lg font-semibold uppercase text-purple-600 lg:text-sm">
          {role}
        </p>
      </div>
    </div>
  );
}
