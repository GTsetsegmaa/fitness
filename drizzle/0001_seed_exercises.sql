-- Data migration: the starter exercise list, so every environment (dev, tests, VPS) has the same one.
-- ON CONFLICT DO NOTHING skips any exercise that already exists (see the lower(name) unique index).
INSERT INTO "exercises" ("name", "kind") VALUES
	('Back Squat', 'strength'),
	('Deadlift', 'strength'),
	('Romanian Deadlift', 'strength'),
	('Bench Press', 'strength'),
	('Incline Dumbbell Press', 'strength'),
	('Overhead Press', 'strength'),
	('Barbell Row', 'strength'),
	('Lat Pulldown', 'strength'),
	('Pull-up', 'strength'),
	('Leg Press', 'strength'),
	('Dumbbell Curl', 'strength'),
	('Triceps Pushdown', 'strength'),
	('Running', 'cardio'),
	('Walking', 'cardio'),
	('Cycling', 'cardio'),
	('Rowing', 'cardio'),
	('Elliptical', 'cardio'),
	('Stair Climber', 'cardio')
ON CONFLICT DO NOTHING;
