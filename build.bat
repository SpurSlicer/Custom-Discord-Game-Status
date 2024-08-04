clear
rm -r build
mkdir build
cp -a resources/assets build/assets
rmdir build/assets/assets
python3 ./tools/build.py
gcc main.c -DWEBVIEW_GTK=1 `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o ./build/main
cd build
./main