

export default function Pagination() {
    return (
        <div class="mt-8 ml-20">
            <div class="flex">
                <a href="#" class="px-3 py-2 mx-1 font-medium text-gray-500 hover:text-primary bg-white rounded-md cursor-not-allowed">
                    previous
                </a>

                <a href="#" class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-primary hover:text-white">
                    1
                </a>

                <a href="#" class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-primary hover:text-white">
                    2
                </a>

                <a href="#" class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-primary hover:text-white">
                    3
                </a>

                <a href="#" class="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-primary hover:text-white">
                    Next
                </a>
            </div>
        </div>
    );
}