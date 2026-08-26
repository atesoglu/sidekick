//! Tauri commands exposed to the frontend. Add new commands here (or split
//! into submodules per domain) and register them in `lib.rs`'s
//! `invoke_handler`.

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
