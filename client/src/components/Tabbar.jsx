import React, { useState } from 'react'

const Tabbar = ({ categories, defaultVal, width = 20, onTabChange }) => {


    const [activeTab, setActiveTab] = useState(defaultVal);

    const handleTabClick = (category) => {
        setActiveTab(category.category_name);
        if (onTabChange) {
            onTabChange(category);
        }
    };

    return (
        <>
            {
                categories.map((category) => (
                    <label
                        key={category.category_id}
                        className={`cursor-pointer font-semibold text-sm uppercase h-8 w-${width} border-b-2 inline-block whitespace-nowrap pt-1 ${activeTab === category.category_name ? "text-[#6A7EFC] border-[#6A7EFC]" : "border-transparent"}`}
                        onClick={() => handleTabClick(category)}
                    >
                        {category.category_name}
                    </label>
                ))
            }

        </>
    )
}

export default Tabbar