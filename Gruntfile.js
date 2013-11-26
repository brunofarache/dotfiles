/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/eduardolundgren/dotfiles/blob/master/LICENSE.md
 *
 * @author Eduardo Lundgren <eduardo.lundgren@gmail.com>
 */

'use strict';

var userhome = require('userhome');

module.exports = function(grunt) {

    grunt.initConfig({

        // -- Config -----------------------------------------------------------

        config: {

            git: {
                path_gitconfig: userhome('.gitconfig'),
                path_gitignore: userhome('.gitignore_global')
            },

            osx: {
                path_osx: userhome('.osx')
            },

            ruby: {
                path_build: userhome('.rbenv/plugins/ruby-build'),
                path_rbenv: userhome('.rbenv')
            },

            zsh: {
                path_oh_my_zsh: userhome('.oh-my-zsh'),
                path_syntax_highlighting: userhome('.oh-my-zsh/custom/plugins/zsh-syntax-highlighting'),
                path_z: userhome('.z'),
                path_zshrc: userhome('.zshrc')
            }

        },

        // -- Prompt -----------------------------------------------------------

        prompt: {
            config: {
                options: {
                    questions: [
                        {
                            config: 'config.osx.computername',
                            default: 'eduardo',
                            message: 'Which computer name would you like to use?'
                        },
                        {
                            config: 'config.osx.hostname',
                            default: 'eduardo',
                            message: 'Which hostname would you like to use?'
                        },
                        {
                            config: 'config.osx.localhostname',
                            default: 'eduardo',
                            message: 'Which local hostname would you like to use?'
                        },
                        {
                            config: 'config.osx.netbiosname',
                            default: 'eduardo',
                            message: 'Which netbios name would you like to use?'
                        },
                        {
                            config: 'config.git.name',
                            default: 'Eduardo Lundgren',
                            message: 'Which Git name would you like to use?'
                        },
                        {
                            config: 'config.git.email',
                            default: 'eduardo.lundgren@liferay.com',
                            message: 'Which Git email would you like to use?'
                        },
                        {
                            config: 'config.editor',
                            default: 'subl',
                            message: 'Which editor would you like to use?'
                        },
                        {
                            config: 'config.zsh.plugins',
                            default: 'ant git history-substring-search z zsh-syntax-highlighting',
                            message: 'Which Oh my zsh! plugins would you like to use (https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins)?'
                        },
                        {
                            config: 'config.zsh.theme_oh_my_zsh',
                            default: 'robbyrussell',
                            message: 'Which Oh my zsh! theme would you like to use (https://github.com/robbyrussell/oh-my-zsh/tree/master/themes)?'
                        }
                    ]
                }
            }
        },

        // -- Clean ------------------------------------------------------------

        clean: {

            all: {
                options: {
                    force: true
                },
                src: [
                    '<%= config.git.path_gitconfig %>',
                    '<%= config.git.path_gitignore %>',
                    '<%= config.osx.path_osx %>',
                    '<%= config.ruby.path_build %>',
                    '<%= config.ruby.path_rbenv %>',
                    '<%= config.zsh.path_syntax_highlighting %>',
                    '<%= config.zsh.path_oh_my_zsh %>',
                    '<%= config.zsh.path_zshrc %>'
                ]
            }

        },

        // -- Templates --------------------------------------------------------

        template: {

            git: {
                options: {
                    data: '<%= config %>'
                },
                files: {
                    '<%= config.git.path_gitconfig %>': ['templates/.gitconfig'],
                    '<%= config.git.path_gitignore %>': ['templates/.gitignore_global']
                }
            },

            osx: {
                options: {
                    data: '<%= config %>'
                },
                files: {
                    '<%= config.osx.path_osx %>': ['templates/.osx']
                }
            },

            zsh: {
                options: {
                    data: '<%= config %>'
                },
                files: {
                    '<%= config.zsh.path_zshrc %>': ['templates/.zshrc']
                }
            }

        },

        // -- Git --------------------------------------------------------------

        gitclone: {

            ruby_rbenv: {
                options: {
                    directory: '<%= config.ruby.path_rbenv %>',
                    repository: 'https://github.com/sstephenson/rbenv.git'
                }
            },

            ruby_build: {
                options: {
                    directory: '<%= config.ruby.path_build %>',
                    repository: 'https://github.com/sstephenson/ruby-build.git'
                }
            },

            oh_my_zsh: {
                options: {
                    directory: '<%= config.zsh.path_oh_my_zsh %>',
                    repository: 'https://github.com/robbyrussell/oh-my-zsh.git'
                }
            },

            zsh_syntax_highlighting: {
                options: {
                    directory: '<%= config.zsh.path_syntax_highlighting %>',
                    repository: 'https://github.com/zsh-users/zsh-syntax-highlighting.git'
                }
            }

        },

        // -- Symbolic links ---------------------------------------------------

        symlink: {

            sublime: {
                dest: '/usr/local/bin/subl',
                relativeSrc: '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'
            }

        },

        // -- Exec -------------------------------------------------------------

        exec: {

            osx: {
                cmd: 'source <%= config.osx.path_osx %>'
            },

            zsh: {
                cmd: 'chsh -s /bin/zsh'
            },

            z: {
                cmd: 'touch <%= config.zsh.path_z %>'
            },

            node_latest: {
                cmd: 'n latest &> /dev/null'
            },

            node_stable: {
                cmd: 'n stable &> /dev/null'
            },

            ruby_compass: {
                cmd: 'gem install compass'
            },

            ruby_jekyll: {
                cmd: 'gem install jekyll'
            },

            ruby_update: {
                cmd: 'gem update --system'
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-symlink');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('default', ['clean', 'prompt', 'template', 'gitclone', 'exec', 'symlink']);

};