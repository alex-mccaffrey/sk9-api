const sessions = [
    {
        id: 1,
        title: "Session 1",
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 1,
        details: "This is a test session about dog training. Sunny, warm, short",
        drill_type: "Blind",
    },
    {
        id: 2,
        title: "Session 2",
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 2,
        details: "This is a test session about dog training. Cloudy, warm, long",
        drill_type: "Multiple",
    },
    {
        id: 3,
        title: "Session 3",
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 1,
        details: "This is a test session about dog training. Sunny, cold, short",
        drill_type: "Runaway",
    },
    {
        id: 4,
        title: "Session 4",
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 2,
        details: "This is a test session about dog training. Snowy, cold, short",
        drill_type: "Runaway",
    }
]

const folders = [
    {
        id: 1,
        title: "Folder 1",
    },
    {
        id: 2,
        title: "Folder 2",
    },
    {
        id: 3,
        title: "Folder 3",
    }
]

module.exports = { sessions, folders }