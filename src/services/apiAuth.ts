import supabase from "./supabase";

export const fetchAuth = async () => {
  // Retrieve a session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // Retrieve a user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
};

export async function fetchLogin({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
