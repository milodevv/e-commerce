import React from 'react';

const HeroSection = () => {
    return (
    <div className="relative h-[300px] w-full">
        <img
        src="/public/images/discounts/discount-2.png" // ← cambia esto por la ruta correcta
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Capa difuminada inferior */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-b from-transparent to-[#f5f6f7] z-10" />
    </div>
    );
};

export default HeroSection;
