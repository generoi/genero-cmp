<?php

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

class RoboFile extends \Robo\Tasks
{
    use \Generoi\Robo\Task\Placeholder\loadTasks;

    public $machineName = 'genero-cmp';
    public $name = 'genero-cmp';
    public $namespace = 'GeneroCmp';
    public $description = 'CMP Plugin';

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
            ->directories(['src'])
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

        if ($this->machineName !== $machineName) {
            $this->_rename("{$this->machineName}.php", "{$machineName}.php");
        }
    }
}
