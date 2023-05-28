import LoginModal from "../components/LoginModal";
import { useModal } from "@providers";

export default function Home() {
  const { openModal } = useModal();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">John Doe</h1>
          <p className="text-gray-700 mb-4">Front-End Developer</p>
          <ul className="mb-4">
            <li className="flex items-center text-gray-600">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg> */}
              Location: San Francisco, CA
            </li>
            <li className="flex items-center text-gray-600">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg> */}
              Email: johndoe@example.com
            </li>
            <li className="flex items-center text-gray-600">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg> */}
              Website: johndoe.com
            </li>
          </ul>
          <p>
            I am a passionate front-end developer with experience in building
            responsive and user-friendly web applications. I enjoy working with
            modern technologies like React, Next.js, and Tailwind CSS. My goal
            is to create delightful experiences for users by crafting clean and
            efficient code.
          </p>
        </div>
      </div>
      <button onClick={() => openModal(<LoginModal />, "Login Modal")}>
        open Modal
      </button>
    </div>
  );
}
