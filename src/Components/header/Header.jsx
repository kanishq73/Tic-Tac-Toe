import React from "react";

export default function Header() {
    return (
        <header>
            <nav className=" shadow-xl px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">

                <div className="flex flex-wrap justify-center items-center text-5xl  ">
                    <h1 className="text-pink-400  mx-8 font-semibold ">X</h1>
                    <h1 className="text-green-400 mx-4 font-serif">Tic-Tac-Toe</h1>
                    <h1 className="text-pink-400 mx-8 font-semibold">O</h1>
                </div>        
                       
                </div>
            </nav>
        </header>
    );
}

