import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def run_diagnostics():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Enable browser logs collection
    chrome_options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("="*60)
        print("DIAGNOSING HOME PAGE (http://localhost:8000)")
        print("="*60)
        driver.get("http://localhost:8000")
        time.sleep(3) # Wait for page and 3D scenes to load
        
        # Check logs
        logs = driver.get_log('browser')
        print(f"Found {len(logs)} console logs on Home Page:")
        for entry in logs:
            print(f"[{entry['level']}] {entry['message']}")
            
        # Check DOM elements
        print("\nChecking DOM element contents:")
        services = driver.execute_script("return document.querySelectorAll('.service-card').length")
        milestones = driver.execute_script("return document.querySelectorAll('.timeline-item').length")
        gallery = driver.execute_script("return document.querySelectorAll('.gallery-item').length")
        videos = driver.execute_script("return document.querySelectorAll('.video-card').length")
        print(f"- Service Cards rendered: {services}")
        print(f"- Timeline items rendered: {milestones}")
        print(f"- Gallery items rendered: {gallery}")
        print(f"- Video cards rendered: {videos}")
        
        # Diagnose admin console
        print("\n" + "="*60)
        print("DIAGNOSING ADMIN PAGE (http://localhost:8000/admin.html)")
        print("="*60)
        driver.get("http://localhost:8000/admin.html")
        time.sleep(2)
        
        # Check logs
        admin_logs = driver.get_log('browser')
        print(f"Found {len(admin_logs)} console logs on Admin Page:")
        for entry in admin_logs:
            print(f"[{entry['level']}] {entry['message']}")
            
    except Exception as e:
        print("An error occurred during diagnostics:", e)
    finally:
        driver.quit()

if __name__ == "__main__":
    run_diagnostics()
