export default function Member({ picture, name, role }) {
    return (
        <div className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-2/12 lg:mb-0 mb-12 mt-12 px-4">
            <img
                alt={name}
                src={`img/team/${picture}`}
                className="shadow-lg rounded-full mx-auto max-w-32-px max-h-32-px"
            />
            <div className="p-4 text-center">
                <p className="text-xl font-bold">{name}</p>
                <p className="mt-1 text-sm text-purple-600 uppercase font-semibold">
                    {role}
                </p>
            </div>
        </div>
    );
}