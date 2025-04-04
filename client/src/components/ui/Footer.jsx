import { Link } from 'react-router';

export default function Footer() {
  return (
    <div>
      <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl">
          <div class="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center" style={{padding: '10px'}}>
              © 2025 <Link to="#">Watch-Shop™</Link>{' '}Все права зашищены.
            </span>
            <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
              <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <span class="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
