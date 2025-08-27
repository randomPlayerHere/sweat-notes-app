import streamlit as st
from auth.auth import login, signup, logout
from config.supabase_client import supabase

st.set_page_config(page_title="Sweat Notes")

if "user" not in st.session_state:
    st.session_state["user"] = None

st.title("Fitness & Calorie App")

if st.session_state["user"] is None:
    choice = st.radio("Login or Signup", ["Login", "Signup"])
    email = st.text_input("Email")
    password = st.text_input("Password", type="password")

    if st.button("Submit"):
        if choice == "Login":
            res = login(email, password)
        else:
            res = signup(email, password)

        if res and res.user:
            st.session_state["user"] = res.user
            st.success("Logged in!")

            profile = supabase.table("profiles").select("*").eq("id", res.user.id).execute().data
            if not profile:
                st.info("Please complete your profile setup below:")
                age = st.number_input("Age", 10, 100)
                weight = st.number_input("Weight (kg)", 30, 200)
                height = st.number_input("Height (cm)", 100, 250)
                gender = st.selectbox("Gender", ["male", "female"])
                goal = st.selectbox("Goal", ["fat loss", "muscle gain", "maintenance"])

                if st.button("Save Profile"):
                    supabase.table("profiles").insert({
                        "id": res.user.id,
                        "age": age,
                        "weight": weight,
                        "height": height,
                        "gender": gender,
                        "goal": goal
                    }).execute()
                    st.success("Profile created!")

# else:
#     st.sidebar.success(f"Logged in as {st.session_state['user'].email}")
#     if st.sidebar.button("Logout"):
#         logout()
