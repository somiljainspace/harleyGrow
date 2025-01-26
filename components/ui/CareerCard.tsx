import React from 'react';

interface CareerCardProps {
    title: string;
    description: string;
    location: string;
    applyLink: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ title, description, location, applyLink }) => {
    return (
        <div className="career-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <p><strong>Location:</strong> {location}</p>
            <a href={applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
        </div>
    );
};

export default CareerCard;