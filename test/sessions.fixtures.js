function makeSessionsArray() {
    return [
        {
            id: 1,
            title: "Session 1",
            modified: "02-27-2021",
            folder_id: 1,
            details: "This is a test session about dog training. Sunny, warm, short",
            drill_type: "Blind",
        },
        {
            id: 2,
            title: "Session 2",
            modified: "2021-02-25T00:00:00.000Z",
            folder_id: 2,
            details: "This is a test session about dog training. Cloudy, warm, long",
            drill_type: "Multiple",
        },
        {
            id: 3,
            title: "Session 3",
            modified: "02-26-2021",
            folder_id: 1,
            details: "This is a test session about dog training. Sunny, cold, short",
            drill_type: "Runaway",
        },
        {
            id: 4,
            title: "Session 4",
            modified: "02-22-2021",
            folder_id: 2,
            details: "This is a test session about dog training. Snowy, cold, short",
            drill_type: "Runaway",
        }
    ];
  }

//   function makeMaliciousNote() {
//     const maliciousNote = {
//       id: 911,
//       id: 3,
//       name: 'Naughty naughty very naughty <script>alert("xss");</script>',
//       modified: "2018-08-15 17:00:00",
//       folder_id: "3",
//       content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
//     };
//     const expectedNote = {
//       ...maliciousNote,
//       name:
//       'Naughty naughty very naughty <script>alert("xss");</script>',
//       content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
//     };
//     return {
//       maliciousNote,
//       expectedNote,
//     };
//   }
  
  module.exports = {
    makeSessionsArray
    //makeMaliciousNote,
  };