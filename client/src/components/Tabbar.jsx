import React, { useState } from 'react'

const Tabbar = () => {

    const categories = ["All", "Work", "School", "Thoughts"];
    const [selected, setSelected] = useState("All");

    return (
        <div className='flex grow-2 gap-x-6 text-[#8B8B8B]'>
            {categories.map((category) => (
                <label
                    key={category}
                    className={`cursor-pointer h-8 w-20 border-b-2 pt-1  ${selected === category ? "text-[#6A7EFC] border-[#6A7EFC]" : "border-transparent"}`}
                    onClick={() => setSelected(category)}
                >
                    {category}
                </label>
            ))
            }
            <button className="text-[#303841]  h-8 ml-4">+ Add Category</button>
        </div >
    )
}

export default Tabbar