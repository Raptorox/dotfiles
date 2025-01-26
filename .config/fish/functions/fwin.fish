function fwin
    hyprctl clients | g -iE '^Window.*firefox' | wc -l
end
