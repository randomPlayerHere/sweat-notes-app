from config.supabase_client import supabase
import streamlit as st

def login(email, password):
    try:
        result = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        return result
    except Exception as e:
        st.error(f"Login failed: {e}")
        return None
    
def signup(email,password):
    try:
        result=supabase.auth.sign_up({
            "email":email,
            "password":password
        })
        return result
    except Exception as e:
        st.error(f"Sign Up Failed: {e}")
        return None

def logout():
    st.session_state["user"] = None