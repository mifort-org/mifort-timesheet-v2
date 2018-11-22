module.exports = `
    enum BackupLocation {
        app
        s3
        ftp
    }
    
    enum BackupFrequency {
        daily
        weekly
    }

    type BackupOptions {
        enabled: Boolean!
        location: BackupLocation!
        frequency: BackupFrequency!
        time: String
        day: Int
        publicKey: String
        privateKey: String
        url: String
    }
`;
