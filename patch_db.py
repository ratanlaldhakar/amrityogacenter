import re

def patch():
    filepath = 'd:\\yoga\\js\\db.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Let's inspect the top-level declaration first:
    # let supabase = null;
    # if (USE_SUPABASE) {
    #   if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
    #     supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    # ...
    
    # We will rename the local variable declaration and references to 'dbClient',
    # but KEEP 'window.supabase' and 'window.supabase.createClient' as is since those refer to the CDN!
    
    # 1. First, replace the initialization block carefully:
    old_init = """let supabase = null;
if (USE_SUPABASE) {
  if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
    console.error("Supabase Client is not loaded. Please ensure the CDN script is loaded in your HTML.");
  }
}"""

    new_init = """let dbClient = null;
if (USE_SUPABASE) {
  if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
    dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
    console.error("Supabase Client is not loaded. Please ensure the CDN script is loaded in your HTML.");
  }
}"""

    content = content.replace(old_init, new_init)
    
    # 2. Replace all checks and calls of the local 'supabase' variable with 'dbClient'.
    # We replace:
    # "USE_SUPABASE && supabase" -> "USE_SUPABASE && dbClient"
    # "await supabase.from" -> "await dbClient.from"
    # "supabase.from" -> "dbClient.from"
    
    content = content.replace("USE_SUPABASE && supabase", "USE_SUPABASE && dbClient")
    content = content.replace("await supabase.from", "await dbClient.from")
    content = content.replace("query = supabase.from", "query = dbClient.from")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("db.js successfully patched!")

patch()
