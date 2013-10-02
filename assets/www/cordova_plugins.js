cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins\\org.apache.cordova.core.splashscreen\\www\\splashscreen.js",
        "id": "org.apache.cordova.core.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.camera\\www\\CameraConstants.js",
        "id": "org.apache.cordova.core.camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.camera\\www\\CameraPopoverOptions.js",
        "id": "org.apache.cordova.core.camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.camera\\www\\Camera.js",
        "id": "org.apache.cordova.core.camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.camera\\www\\CameraPopoverHandle.js",
        "id": "org.apache.cordova.core.camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.device\\www\\device.js",
        "id": "org.apache.cordova.core.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\contacts.js",
        "id": "org.apache.cordova.core.contacts.contacts",
        "clobbers": [
            "navigator.contacts"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\Contact.js",
        "id": "org.apache.cordova.core.contacts.Contact",
        "clobbers": [
            "Contact"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\ContactAddress.js",
        "id": "org.apache.cordova.core.contacts.ContactAddress",
        "clobbers": [
            "ContactAddress"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\ContactError.js",
        "id": "org.apache.cordova.core.contacts.ContactError",
        "clobbers": [
            "ContactError"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\ContactField.js",
        "id": "org.apache.cordova.core.contacts.ContactField",
        "clobbers": [
            "ContactField"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\ContactFindOptions.js",
        "id": "org.apache.cordova.core.contacts.ContactFindOptions",
        "clobbers": [
            "ContactFindOptions"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\ContactName.js",
        "id": "org.apache.cordova.core.contacts.ContactName",
        "clobbers": [
            "ContactName"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.contacts\\www\\ContactOrganization.js",
        "id": "org.apache.cordova.core.contacts.ContactOrganization",
        "clobbers": [
            "ContactOrganization"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\DirectoryEntry.js",
        "id": "org.apache.cordova.core.file.DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\DirectoryReader.js",
        "id": "org.apache.cordova.core.file.DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\Entry.js",
        "id": "org.apache.cordova.core.file.Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\File.js",
        "id": "org.apache.cordova.core.file.File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileEntry.js",
        "id": "org.apache.cordova.core.file.FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileError.js",
        "id": "org.apache.cordova.core.file.FileError",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileReader.js",
        "id": "org.apache.cordova.core.file.FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileSystem.js",
        "id": "org.apache.cordova.core.file.FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileUploadOptions.js",
        "id": "org.apache.cordova.core.file.FileUploadOptions",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileUploadResult.js",
        "id": "org.apache.cordova.core.file.FileUploadResult",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\FileWriter.js",
        "id": "org.apache.cordova.core.file.FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\Flags.js",
        "id": "org.apache.cordova.core.file.Flags",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\LocalFileSystem.js",
        "id": "org.apache.cordova.core.file.LocalFileSystem",
        "clobbers": [
            "window.LocalFileSystem"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\Metadata.js",
        "id": "org.apache.cordova.core.file.Metadata",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\ProgressEvent.js",
        "id": "org.apache.cordova.core.file.ProgressEvent",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\requestFileSystem.js",
        "id": "org.apache.cordova.core.file.requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file\\www\\resolveLocalFileSystemURI.js",
        "id": "org.apache.cordova.core.file.resolveLocalFileSystemURI",
        "clobbers": [
            "window.resolveLocalFileSystemURI"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file-transfer\\www\\FileTransferError.js",
        "id": "org.apache.cordova.core.file-transfer.FileTransferError",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins\\org.apache.cordova.core.file-transfer\\www\\FileTransfer.js",
        "id": "org.apache.cordova.core.file-transfer.FileTransfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    }
]
});