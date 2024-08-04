#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define FILE_PROTOCOL_SIZE 8

void h_err_exit(int status) {
    printf("[ERROR] [%d] Press enter to exit. ", status);
    getchar();
    exit(status);
}

char* h_get_abs_path(const char* path) {
    char* temp_path = NULL;
    if (!(temp_path = realpath(path, NULL))) {
        printf("[LOG] [H_GET_ABS_PATH] file \"%s\" not found!\n", path);
    } else printf("[LOG] [H_GET_ABS_PATH] path \"%s\" found!\n", temp_path);
    if (!temp_path) printf("I get here\n");
    int temp_path_len = 0;
    for (; temp_path[temp_path_len] != '\0'; temp_path_len++);
    temp_path_len++;
    char* ret_path = (char*)calloc(temp_path_len+FILE_PROTOCOL_SIZE, sizeof(char));
    strncat(ret_path, "file://", FILE_PROTOCOL_SIZE);
    strncat(ret_path, temp_path, temp_path_len);
    free(temp_path);
    printf("path: %s\n", ret_path);
    return ret_path;
}