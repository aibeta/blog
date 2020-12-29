---
title: vim 配置
date: 2018-2-8
---

这里记录一下基本的 vim 配置

<!--more-->

" tab 占用4个空格
set ts=4
set expandtab
%retab!

" 设置空进的空格数
set shiftwidth=2	

" 显示行号
 set nu!  

" 语法高亮
syntax on 

" Macvim，复制到系统粘贴板
set clipboard=unnamed

" 编码
set encoding=utf-8

" 自动缩进
set autoindent

" 插件需要放在 Vundle 之间
set nocompatible              " be iMproved, required
filetype off                  " required

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'mattn/emmet-vim'

call vundle#end()            " required
filetype plugin indent on    " required

" emmet 设置
let g:emmet_html5 = 0
let g:user_emmet_install_global = 0
autocmd FileType html,css EmmetInstall
let g:user_emmet_leader_key='<C-Z>' 
" let g:user_emmet_expandabbr_key='<Tab>'
imap <expr> <tab> emmet#expandAbbrIntelligent("\<tab>")
