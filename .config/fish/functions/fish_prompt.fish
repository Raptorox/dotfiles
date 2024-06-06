function fish_prompt
	set_color blue
	echo -n \n'╭'
	set_color normal
	echo -n '['
	set_color red
	echo -n (date '+%T')
	set_color $fish_color_cwd
	echo -n ' '(prompt_pwd)
	set_color normal
	echo ']'
	set_color blue
	echo '╰→ '
end
