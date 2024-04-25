<?php

namespace GeneroWP\GeneroCmp\Models;

class Consent
{
    public const NECESSARY = 'necessary';
    public const PREFERENCES = 'preferences';
    public const STATISTICS = 'statistics';
    public const MARKETING = 'marketing';

    public function __construct(
        public string $id,
        public string $label,
        public string $description,
        public bool $necessary = false,
        public bool $consent = false,
        public array $gtmConsentModes = [],
        public ?string $wpConsentApiCategory = null,
    ) {
    }

    public function hash(): string
    {
        return md5(json_encode([
            $this->id,
            $this->necessary,
            $this->consent,
        ]));
    }
}
