<?php

namespace Drupal\vulkan_custom_2019\Plugin\Block;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Provides a block with a simple text.
 *
 * @Block(
 *   id = "add_content_button_block",
 *   admin_label = @Translation("Add Content Button"),
 * )
 */
class AddContentButtonBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
  	$button = '';
  	$route = \Drupal::routeMatch();
    if ($route->getRouteName() == 'entity.taxonomy_term.canonical') {
      $term_id = $route->getRawParameter('taxonomy_term');
      global $base_url;
      $add_content_href = $base_url . '/node/add/work?edit[field_catalog][widget][0][target_id]=' . $term_id . '&destination=' . drupal_get_destination()['destination'];
      $button = '<a href="' . $add_content_href . '" class="button add_content_button">' . $this->t('Add content') . '</a>';
    }
    return [
      '#markup' => $button,
    ];
  }

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    return AccessResult::allowedIfHasPermission($account, 'administer site configuration');
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $config = $this->getConfiguration();

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['add_content_button_block_settings'] = $form_state->getValue('add_content_button_block_settings');
  }
}