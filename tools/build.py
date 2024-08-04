import os

composed_text = []

html = open("resources/index.html", "r")
html_text = html.readlines()
html.close()

js_name = ""
defer_flag = False

for line in html_text:
    if "<link" in line:
        line = line[line.find("href=\"")+6:]
        line = line.replace("./", "")
        line = line.replace(".\\", "")
        css_name = line[:line.find("\"")]
        try:
            css = open(f"resources/{css_name}", "r")
            css_text = css.readlines()
            css.close()
            composed_text.append("<style>\n")
            for subline in css_text:
                composed_text.append(subline)
            composed_text.append("</style>\n")
        except:
            print(f"[BS-LOG] {css_name} not found! Skipping...")
        finally:
            continue
    elif "<script" in line:
        if "defer" in line:
            defer_flag = True
        line = line[line.find("src=\"")+5:]
        line = line.replace("./", "")
        line = line.replace(".\\", "")
        js_name = line[:line.find("\"")]
        if defer_flag:
            continue
        try:
            js = open(f"resources/{js_name}", "r")
            js_text = js.readlines()
            js.close()
            composed_text.append("<script>\n")
            for subline in js_text:
                composed_text.append(subline)
            composed_text.append("</script>\n")
        except:
            print(f"[BS-LOG] {js_name} not found! Skipping...")
        finally:
            continue
    elif "</html>" in line and defer_flag:
        try:
            js = open(f"resources/{js_name}", "r")
            js_text = js.readlines()
            js.close()
            composed_text.append("<script>\n")
            for subline in js_text:
                composed_text.append(subline)
            composed_text.append("</script>\n")
            composed_text.append("</html>\n")
        except:
            print(f"[BS-LOG] {js_name} not found! Skipping...")
        finally:
            continue
    else:
        composed_text.append(line)

composed = open("build/index.html", "w")
composed.writelines(composed_text)
composed.close()

print(os.path.abspath("build/index.html"))