TRUNCATE  sk9_sessions RESTART IDENTITY CASCADE;
TRUNCATE  sk9_folders RESTART IDENTITY CASCADE;

INSERT INTO sk9_folders (title)
VALUES

('Folder 1'),
('Folder 2');



INSERT INTO sk9_sessions (title, modified, folder_id, details, drill_type)
VALUES
(       
        'Session 1',
        '02-27-2021',
        1,
        'This is a test session about dog training. Sunny, warm, short',
        'Blind'
    ),
    (
        'Session 2',
        '02-25-2021',
        2,
        'This is a test session about dog training. Cloudy, warm, long',
        'Multiple'
    ),
    (
        'Session 3',
        '02-26-2021',
        1,
        'This is a test session about dog training. Sunny, cold, short',
        'Runaway'
    ),
    (
        'Session 4',
        '02-22-2021',
        2,
        'This is a test session about dog training. Snowy, cold, short',
        'Runaway'
    );
