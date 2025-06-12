
function Footer() {
    return (
        <footer className="py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Bookinline. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;