from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
SUPABASE_URL = "SUPABASE_URL"
SUPABASE_KEY = "SUPABSE_KEY"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
