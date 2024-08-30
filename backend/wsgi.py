from app import app

application = app

if __name__ == "__main__":
    print("Starting Flask application...")
    app.run()
    print("Flask application started.")