import React from 'react';

const Careers: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Careers</h1>
            <p>Join our team and help us build amazing products!</p>
            
            <section>
                <h2>Open Positions</h2>
                <ul>
                    <li>
                        <h3>Software Engineer</h3>
                        <p>We are looking for a skilled software engineer to join our team.</p>
                        <button>Apply Now</button>
                    </li>
                    <li>
                        <h3>Product Manager</h3>
                        <p>We need a product manager to help us define and deliver our product roadmap.</p>
                        <button>Apply Now</button>
                    </li>
                    <li>
                        <h3>UX Designer</h3>
                        <p>Join our design team to create user-friendly interfaces for our products.</p>
                        <button>Apply Now</button>
                    </li>
                </ul>
            </section>
            
            <section>
                <h2>Why Work With Us?</h2>
                <ul>
                    <li>Competitive salary and benefits</li>
                    <li>Flexible working hours</li>
                    <li>Opportunities for growth and development</li>
                    <li>Collaborative and inclusive work environment</li>
                </ul>
            </section>
        </div>
    );
};

export default Careers;