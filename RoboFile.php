<?php

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

class RoboFile extends \Robo\Tasks
{
    use \Generoi\Robo\Task\Placeholder\loadTasks;
    use \Generoi\Robo\Command\SearchReplaceCommand;

    public $machineName = 'wp-plugin-boilerplate';
    public $name = 'Plugin Boilerplate';
    public $namespace = 'PluginBoilerplate';
    public $description = 'A boilerplate WordPress plugin';

    public function rename($machineName = null, $options = [
        'force' => false,
        'namespace' => null,
        'description' => null,
        'name' => null,
    ])
    {
        $name = $options['name'];
        $namespace = $options['namespace'];
        $description = $options['description'];
        if (empty($machineName)) {
            $machineName = $this->askDefault('Machine name', $this->machineName);
        }
        if (empty($name)) {
            $name = $this->askDefault('Plugin name', $this->name);
        }
        if (empty($namespace)) {
            $namespace = $this->askDefault('Namespace', $this->namespace);
        }
        if (empty($description)) {
            $description = $this->askDefault('Description', $this->description);
        }

        $result = $this->taskPlaceholderFind("$this->machineName|$this->name|$this->namespace|$this->description")
            ->io($this->io())
            ->run();

        $files = $result['files'];
        if (count($files) > 0) {
            if (empty($options['force'])) {
                $options['force'] = $this->io()->confirm(sprintf('Do you want to replace names in these files?'));
            }

            if (!empty($options['force'])) {
                $this->taskPlaceholderReplace($this->machineName)->with($machineName)->in($files)->run();
                $this->taskPlaceholderReplace($this->name)->with($name)->in($files)->run();
                $this->taskPlaceholderReplace($this->namespace)->with($namespace)->in($files)->run();
                $this->taskPlaceholderReplace($this->description)->with($description)->in($files)->run();
            }

            if (in_array('./composer.json', $files)) {
                $this->taskComposerDumpAutoload()->run();
            }
        }
    }

    public function versionBump($version = '', $options = ['stage' => ''])
    {
        // If the user did not specify a version, then update the current version.
        if (empty($version)) {
            $version = $this->incrementVersion($this->versionCurrent(), $options['stage']);
        }
        $this->say('Updated Plugin version to ' . $version);
        return $this->writeVersion($version);
    }

    public function versionCurrent()
    {
        $pluginPhp = file_get_contents('plugin.php');
        if (preg_match('/^[ \t\/*#@]*Version:(.*)$/mi', $pluginPhp, $matches) && $matches[1]) {
            return trim($matches[1]);
        }
    }

    protected function writeVersion($version)
    {
         $this->taskReplaceInFile('plugin.php')
            ->regex("#version = '[^']*'#")
            ->to("version = '" . $version . "'")
            ->run();

         $this->taskReplaceInFile('plugin.php')
            ->regex('#^Version:(\s*)([^\s]*)$#m')
            ->to('Version:${1}' . $version)
            ->run();

         $this->taskReplaceInFile('package.json')
            ->regex('#"version": "[^"]*"#')
            ->to('"version": "' . $version . '"')
            ->run();
    }

    protected function incrementVersion($version, $stage = '')
    {
        if (empty($stage)) {
            $stage = 'patch';
        }
        $stable = ($stage === 'minor') || ($stage === 'major') || ($stage === 'patch');
        $versionStageNumber = '0';
        preg_match('/-([a-zA-Z]*)([0-9]*)/', $version, $match);
        $match += ['', '', ''];
        $versionStage = $match[1];
        $versionStageNumber = $match[2];
        if ($versionStage != $stage) {
            $versionStageNumber = 0;
        }
        $version = preg_replace('/-.*/', '', $version);
        $versionParts = explode('.', $version);
        if ($stable) {
            switch ($stage) {
                case 'major':
                    $versionParts[0]++;
                    $versionParts[1] = '0';
                    $versionParts[2] = '0';
                    break;
                case 'minor':
                    $versionParts[1]++;
                    $versionParts[2] = '0';
                    break;
                case 'patch':
                    $versionParts[2]++;
                    break;
            }
        }
        $version = implode('.', $versionParts);
        if (!$stable) {
            $version .= '-' . $stage;
            if ($stage != 'dev') {
                $versionStageNumber++;
                $version .= $versionStageNumber;
            }
        }
        return $version;
    }
}
