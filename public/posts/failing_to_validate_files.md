---
name: "Failing to Validate Files: A Technical Post"
author: Avery Keuben
date: March 2024
tags: 
    - security
    - development
---
Files are a part of almost every computer program, but failing to verify the security and integrity of these files can lead to malware, data breaches, privacy violations, and many other security breaches. In particular, in this article, we will look at two different instances of hackers achieving remote code execution (RCE) on a target machine. The first will consider hackers taking control of a web server, while the second concerns end users using desktop applications.

# What is Remote Code Execution?

Figure 1: Diagram Explaining Remote Code Execution

Remote code execution is a vector for malware to spread, or for hackers to gain unauthorized access to a system. It allows for hacker controlled code to be run on a target system without physical access[1]. RCE allows for many different kinds of payloads. They could install malware on the system, steal data from a database, or in most cases, get a reverse shell to the target machine. A reverse shell gives the hackers unauthorized and unlimited access to the target machine through a command line interface, such as the /bin/sh program on unix machines[2].

# Instance 1: Royal Elementor Addons and Templates WordPress plugin

Figure 2: Elementor Visual Website Editor

The Royal Elementor Addons and Templates WordPress plugin is a tool that allows a website administrator to visually create websites without requiring any programming experience[3]. It is a plugin made for wordpress, a website framework that allows for the easy creation of websites with a vast marketplace of addons to support many different use cases.

## What is PHP?

Wordpress as a platform is built upon using the PHP programming language to generate the HTML the web browser renders. This allows wordpress to calculate what files to load and when, validating permissions, fetching metadata for posts, running plugins, and much more[4]. PHP is a server side programming language, meaning it runs on the server in order to generate the static HTML[5]. Like many other programming languages, it has the ability to interact with the computer running the software, including accessing databases or making web requests[6].

## How were hackers able to achieve RCE?

The Royal Elementor Addons and Templates WordPress plugin failed to authenticate and validate files uploaded by the user, allowing a hacker to upload any kind of file to the web server[7]. Since any file can be uploaded, a malicious PHP script could be uploaded to the web server. As soon as somebody visits the PHP file on the website (for example, my-site.com/wp-content/rce.php), the script would be immediately run by the web server, running the code on the server, and activating the payload, for instance a reverse shell.

## What was the response?

The issue was assigned a CVE number (CVE, or Common Vulnerabilities and Exposures, is a list of publicly disclosed computer security flaws[8]) CVE-2023-5360[9] and was given a base score of 9.8/10, in the critical category. The issue was resolved in version 1.3.79 of the plugin. 

## What does this mean for me?

As this issue pertains to companies and individuals hosting websites using WordPress, if you run such a website, it is important to ensure that the plugins (as well as the wordpress software) you have installed remain up to date, and keep watch for any security alerts.

# Instance 2: Deepin Linux Document Reader

Figure 3: Deepin Desktop Environment

Deepin Linux is a popular linux distribution with a modern UI designed for ease of use for end users. Included in their desktop environment is an application, aptly named “Deepin Document Reader” designed for previewing various kinds of documents, such as PDFs or, as it the issue in this case, microsoft word DOCX files. Before we can get to the details of the exploit, we must first understand file overwrite vulnerabilities and symlinks.

## What is a file overwrite vulnerability?

As the name suggests, a file overwrite vulnerability involves an issue in a program that allows for an arbitrary file on the computer to be overwritten. Usually, it requires the attacker to know the path of the file to overwrite. At first, this may not seem like a huge issue. Maybe the hacker can overwrite some of your pictures, but no real damage can be done, right?

The issue comes when you consider the `.bash_rc` in the home directory of every linux user. Every time the user opens their terminal (or to be more precise, every time they start their shell), this file gets run. It is a list of commands to run upon bash starting, allowing the user to customize how their terminal works[10]. If a hacker were able to overwrite this file, they would be able to run any arbitrary command on a target user's machine, and therefore achieve RCE.

## What is a symlink?

A symlink is a sort of link to another file or directory on a user’s hard drive on a UNIX based operating system. In essence, it allows users to create shortcuts between two locations on their hard drive[11]. This could be useful, for example, if you have a documents folder on a different hard drive located at /mnt/my_other_drive/shared_documents, and want to have that folder in the home directory of every user, say ~/Documents/shared_documents. That way, the directory appears to be in the home directory of every user.

## How were hackers able to achieve RCE?

Now that we understand what a file overwrite vulnerability is, and how symlinks work, we can discuss how these two ideas lead to RCE in the Deepin Linux Document Reader.

First, it is necessary to understand how Deepin-reader opens DOCX files. The application uses shell commands to convert the DOCX file to a PDF file in order to display it to the user. It does this in the following steps[12]:

1. When opening a docx document , deepin-reader creates a temporary directory under /tmp and places the docx document under the directory.
2. Then deepin-reader calls the "unzip" shell command to extract the docx file (since a DOCX file is really just a zip file).
3. After the extraction process, deepin-reader calls "pandoc" command to convert the docx file to an html file named "temp.html" under the word/ directory (created when the docx file is extracted with unzip).
4. Then deepin-reader will try to convert that html file to pdf and open the pdf.

The issue comes when a symlink named word/temp.html is placed inside the docx file. This symlink can point to any other file on the system (such as .bash_rc). When opening the file, pandoc will overwrite the file that the symlink is pointing to. Then, in this case, the next time the user opens their terminal, the .bash_rc file will be executed, and the malicious code will be run.

## What was the response?

The issue was given a Github Security Advisory number GHSA-q9jr-726g-9495 on December 21, 2023 with a severity score of 8.2/10, in the high category. The issue was resolved in version 6.0.7 of the software.

## What does this mean for me?

The most important takeaway here is make sure the software you have installed is up to date. Even then, it is still important to ensure the documents you are opening are from trusted sources, and verify the person who sent you the document is who they say they are. Even if you don’t use Deepin Linux, similar issues could happen in any other project, big or small.

# Final Thoughts

In the digital age, trust is a valuable resource. Giving too much trust to others can result in them exploiting the systems you have in place. In the first example, the plugin was too trusting in allowing file uploads to the web server. There should have been systems in place not only to authenticate the user but also validate the files. In the second case, the system failed to check for malicious code in the DOCX file. Additionally, the second example also outlines the importance is holding back trust as a user, and ensuring that you trust the files you download on your computer.

References:

[1] https://www.cloudflare.com/learning/security/what-is-remote-code-execution/
[2] https://www.imperva.com/learn/application-security/reverse-shell/
[3] https://wordpress.org/plugins/royal-elementor-addons/
[4] https://knowthecode.io/labs/php-101-gentle-introduction-wordpress-programming/episode-3
[5] https://www.php.net/manual/en/intro-whatis.php
[6] https://www.php.net/manual/en/intro-whatcando.php
[7] https://wpscan.com/vulnerability/281518ff-7816-4007-b712-63aed7828b34/
[8] https://www.redhat.com/en/topics/security/what-is-cve
[9] https://nvd.nist.gov/vuln/detail/CVE-2023-5360
[10] https://phoenixnap.com/kb/bashrc
[11] https://en.wikipedia.org/wiki/Symbolic_link
[12] https://github.com/linuxdeepin/developer-center/security/advisories/GHSA-q9jr-726g-9495

Images:

Figure 1: https://www.wallarm.com/what/the-concept-of-rce-remote-code-execution-attack

Figure 2: https://royal-elementor-addons.com/

Figure 3: https://www.deepin.org/en/deepin-20-4-linux-released/
