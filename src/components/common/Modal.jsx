import React, { Fragment } from 'react';
// Kita akan menggunakan 'Headless UI', library dari tim Tailwind
// untuk transisi yang mulus. Instal dulu:
// npm install @headlessui/react
import { Dialog, Transition } from '@headlessui/react';

// Ini adalah komponen Modal/Slide-Over baru kita
function Modal({ isOpen, onClose, title, children }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        
        {/* Latar Belakang Overlay (Gelap) */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              
              {/* Panel yang Bisa Slide */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full" // Mulai dari luar layar
                enterTo="translate-x-0"     // Selesai di dalam layar
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  {/* Konten Panel */}
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    
                    {/* Header Panel (Tema Chatalog) */}
                    <div className="bg-[#006064] px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-bold text-white">
                          {title} {/* Judul dinamis */}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                          onClick={onClose}
                        >
                          <span className="sr-only">Tutup panel</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Konten Utama (dari modal lain) */}
                    <div className="relative flex-1 p-6">
                      {children}
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;