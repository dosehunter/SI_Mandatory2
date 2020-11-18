/* Database table creation*/

CREATE TABLE IF NOT EXISTS BorgerUser(
    [Id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [UserId] INT(10),
    [CreatedAt] TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Address(
    [Id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [BorgerUserId] INT(10),
    [Address] TEXT NOT NULL,
    [CreatedAt] TEXT NOT NULL,
    [IsValid] BOOLEAN NOT NULL,
    FOREIGN KEY(BorgerUserId) REFERENCES BorgerUser(Id)
);