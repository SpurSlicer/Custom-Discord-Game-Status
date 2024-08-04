#define WEBVIEW_IMPLEMENTATION
#include "libs/webview/webview.h"
#include "libs/helper.h"

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

typedef struct file_info {
  char* file;
  int len;
} file_info;

#ifdef _WIN32
#include <windows.h>
#endif

#ifdef _WIN32
int WINAPI WinMain(HINSTANCE hInst, HINSTANCE hPrevInst, LPSTR lpCmdLine,
                   int nCmdShow) {
  (void)hInst;
  (void)hPrevInst;
  (void)lpCmdLine;
  (void)nCmdShow;
#else
int main(void) {
#endif
  char* html_path = NULL;
  html_path = h_get_abs_path(("index.html"));

  struct webview w = {
    .title = "uwu",
    .url = html_path, 
    .width = 800,
    .height = 600,
    .debug = 1,
    .resizable = 1,
  };
  /* Create webview window using the provided options */
  webview_init(&w);
  /* Main app loop, can be either blocking or non-blocking */
  while (webview_loop(&w, 1) == 0);
  /* Destroy webview window, often exits the app */
  webview_exit(&w);

  /* To change window title later: */
  webview_set_title(&w, "Changed title");

  /* To terminate the webview main loop: */
  webview_terminate(&w);

  /* To print logs to stderr, MacOS Console or DebugView: */
  webview_debug("exited: %d\n", 1);
  return 0;
}