

export default function (type) {
    // descriptor.method = type;
    // descriptor.type = "GET";
    return (target) => {
        target.type = type;
    }
}
