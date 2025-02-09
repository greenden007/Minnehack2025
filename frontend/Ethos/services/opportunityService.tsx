// services/opportunityService.tsx

export const fetchOpportunities = async (): Promise<OpportunityList> => {
    // Implement API call to fetch opportunities
    // mock
    return {
        opportunityList: [
            {
                id: "1",
                posterId: "user1",
                title: "Community Garden Clean-up",
                description: "Help clean and prepare community gardens for spring planting.",
                location: "Central Park, New York",
                startDate: "2025-03-15",
                startTime: "09:00",
                duration: "3 hours",
                category: "Environment",
                status: "upcoming",
                minimumAge: 16,
                requiredSkills: "none"
            },
            {
                id: "2",
                posterId: "user2",
                title: "Food Bank Volunteer",
                description: "Assist in sorting and packing food donations at the local food bank.",
                location: "City Food Bank, Chicago",
                startDate: "2025-03-20",
                startTime: "14:00",
                duration: "4 hours",
                category: "Community Service",
                status: "upcoming",
                minimumAge: 18,
                requiredSkills: "none"
            },
            {
                id: "3",
                posterId: "user3",
                title: "Local Library Book Drive",
                description: "Collect and sort donated books for the local library.",
                location: "Downtown Library, Los Angeles",
                startDate: "2025-03-25",
                startTime: "10:00",
                duration: "5 hours",
                category: "Education",
                status: "upcoming",
                minimumAge: 14,
                requiredSkills: "none"
            },
            {
                id: "4",
                posterId: "user4",
                title: "Animal Shelter Assistance",
                description: "Help care for animals at the local animal shelter.",
                location: "Animal Haven, San Francisco",
                startDate: "2025-03-28",
                startTime: "11:00",
                duration: "6 hours",
                category: "Animal Welfare",
                status: "completed",
                minimumAge: 16,
                requiredSkills: "none"
            }
        ]
    };
    
};


export const createOpportunity = async (data) => {
// Implement API call to create an opportunity
};

  